import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { headerModel } from 'src/app/model/common-model';
import { SkillsService } from '../services/skills.service';
import { CommonSnackbarService } from 'src/app/services/common-snackbar.service';
import { CommonAuthService } from 'src/app/services/common-auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers: []
})
export class SkillsComponent implements OnInit, OnDestroy {
  pageSubscription = new Subscription();
  pageProperties = {
    isLoading: false,
    buttonLoading: false,
    userId: null
  }
  displayedColumns: String[] = ['index', 'imageUrl', 'name', 'description', 'Actions'];
  listDataSource: any;
  skillGroupForm!: FormGroup;
  isEdit: boolean = false;
  editDetails: any = {};
  skillGroupHeader: headerModel = {
    heading: 'Skill Group',
    subHeading: 'Yours skill group will displayed here',
    buttonName: "Add Skill Group",
    buttonFunction: 'addSkillGroups',
    iconName: 'build'
  }
  @ViewChild('addSkillGroupTemplate', { static: true }) addSkillGroupTemplate!: TemplateRef<any>;
  constructor(
    private skillsService: SkillsService,
    private snackBar: CommonSnackbarService,
    public dialog: MatDialog,
    private authService: CommonAuthService
  ) {
    this.skillGroupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null),
      description: new FormControl(null)
    })
  }
  ngOnInit(): void {
    this.pageSubscription.add(this.authService.userDetails.subscribe((data) => {
      if (data) {
        this.pageProperties.userId = data._id;
        this.getSkillGroups();
      }
    }));
  }
  getSkillGroups() {
    this.pageProperties.isLoading = true;
    this.pageSubscription.add(this.skillsService.getAllSkillGroups({}).subscribe((data: any) => {
      console.log(data);
      this.listDataSource = new MatTableDataSource(this.processData(data));
      this.pageProperties.isLoading = false;
    }, (err: any) => {
      this.pageProperties.isLoading = false;
      this.snackBar.openCustomSnackBar("Failed to get skill group Details.Error Message:" + err.message, 'close', 'failed', 3000, 'center', 'bottom');
      console.log("error while getting skillGroup");
    }));
  }
  addSkillGroups() {
    this.dialog.open(this.addSkillGroupTemplate, { disableClose: true, width: '600px' });
  }
  saveSkillGroup() {
    this.pageProperties.buttonLoading = true;
    console.log(this.skillGroupForm.value);
    let payload = this.skillGroupForm.value;
    payload['userId'] = this.pageProperties.userId;
    if (!this.isEdit) {
      this.pageSubscription.add(this.skillsService.createSkillGroup({ params: {}, bodyData: payload }).subscribe(() => {
        this.snackBar.openCustomSnackBar("Successfully saved!", 'close', 'success', 2000, 'center', 'bottom');
        this.closeDialog();
        this.getSkillGroups();
        this.pageProperties.buttonLoading = false;
      }, (err: Error) => {
        this.snackBar.openCustomSnackBar("Failed to save!Error Message:" + err.message, 'close', 'failed', 3000, 'center', 'bottom');
        this.pageProperties.buttonLoading = false;
      }));
    }
    else {
      payload = this.skillGroupForm.value;
      payload['userId'] = this.pageProperties.userId;
      payload['_id'] = this.editDetails?._id;
      this.pageSubscription.add(this.skillsService.updateSkillGroup({ params: {}, bodyData: payload }).subscribe(() => {
        this.snackBar.openCustomSnackBar("Successfully updated!", 'close', 'success', 2000, 'center', 'bottom');
        this.pageProperties.buttonLoading = false;
        this.closeDialog();
        this.getSkillGroups();
      }, (err: Error) => {
        this.pageProperties.buttonLoading = false;
        this.snackBar.openCustomSnackBar("Failed to update!Error Message:" + err.message, 'close', 'failed', 2000, 'center', 'bottom');
      }));
      this.closeDialog();
    }
  }
  processData(data: any) {
    data = data.map((e: any, index: number) => { return { _id: e._id, index: index + 1, name: e.name ?? 'N/A', imageUrl: e.imageUrl ?? 'N/A', description: e.description ?? 'N/A', Actions: true } })
    return data;
  }
  editSkillGroup(data: any) {
    this.editDetails = data;
    this.skillGroupForm.get('name')?.setValue(data?.name);
    this.skillGroupForm.get('description')?.setValue(data?.description);
    this.skillGroupForm.get('imageUrl')?.setValue(data?.imageUrl);
    this.isEdit = true;
    this.addSkillGroups();
  }
  deleteSkillGroup(_id: any) {
    this.pageProperties.isLoading = true;
    this.pageSubscription.add(this.skillsService.deleteSkillGroup({ params: {}, queryParams: { _id: _id } }).subscribe((data: any) => {
      this.snackBar.openCustomSnackBar("Successfully deleted!", 'close', 'success', 2000, 'center', 'bottom');
      this.getSkillGroups();
    }, (err: Error) => {
      this.pageProperties.isLoading = false;
      this.snackBar.openCustomSnackBar("Failed to delete!Error Message:" + err.message, 'close', 'failed', 2000, 'center', 'bottom');
    }));
  }
  closeDialog() {
    this.isEdit = false;
    this.editDetails = {};
    this.skillGroupForm.reset();
    this.dialog.closeAll();
  }
  eventHandle(event: any) {
    console.log("Event...emitted...", event);
    (this as any)[event]();
  };
  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
  }
}
