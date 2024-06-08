import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { headerModel } from 'src/app/model/common-model';
import { HttpService } from 'src/app/services/http.service';
import { SkillsService } from '../services/skills.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }]
})
export class SkillsComponent implements OnInit {
  displayedColumns: String[] = ['index', 'imageUrl', 'name', 'description', 'Actions'];
  listDataSource: any;
  skillGroupForm!: FormGroup;
  isEdit: boolean = false;
  editDetails: any = {};
  userId = '665db6f0aff325435c95713e';
  skillGroupHeader: headerModel = {
    heading: 'Skill Group',
    subHeading: 'Yours skill group will displayed here',
    buttonName: "Add Skill Group",
    buttonFunction: 'addSkillGroups',
    iconName: 'build'
  }
  @ViewChild('addSkillGroupTemplate', { static: true }) addSkillGroupTemplate!: TemplateRef<any>;
  constructor(
    private skillsService: SkillsService, private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.skillGroupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null),
      description: new FormControl(null)
    })
  }
  ngOnInit(): void {
    this.getSkillGroups();
  }
  getSkillGroups() {
    this.skillsService.getAllSkillGroups({}).subscribe((data: any) => {
      console.log(data);
      this.listDataSource = new MatTableDataSource(this.processData(data));
    }, (err: any) => {
      this._snackBar.open("Failed to get skill group Details.Error Message:" + err.message, 'close');
      console.log("error while getting skillGroup");
    })
  }
  addSkillGroups() {
    this.dialog.open(this.addSkillGroupTemplate, { disableClose: true, width: '600px' });
  }
  saveSkillGroup() {
    console.log(this.skillGroupForm.value);
    let payload = this.skillGroupForm.value;
    payload['userId'] = this.userId;
    if (!this.isEdit) {
      this.skillsService.createSkillGroup({ params: {}, bodyData: payload }).subscribe(() => {
        this._snackBar.open("Successfully saved!", 'X');
        this.closeDialog();
        this.getSkillGroups();
      }, (err: Error) => {
        this._snackBar.open("Failed to save!Error Message:" + err.message, 'X');
      })
    }
    else {
      payload = this.skillGroupForm.value;
      payload['userId'] = this.userId;
      payload['_id'] = this.editDetails?._id;
      this.skillsService.updateSkillGroup({ params: {}, bodyData: payload }).subscribe(() => {
        this._snackBar.open("Successfully updated.", 'X');
        this.closeDialog();
        this.getSkillGroups();
      }, (err: Error) => {
        this._snackBar.open("Failed to update!Error Message:" + err.message, 'X');
      })

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
    this.skillsService.deleteSkillGroup({ params: {}, queryParams: { _id: _id } }).subscribe((data: any) => {
      this._snackBar.open("Successfully deleted!", 'X');
      this.getSkillGroups();
    }, (err: Error) => {
      this._snackBar.open("Failed to delete!Error Message:" + err.message, 'X');
    })
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
}
