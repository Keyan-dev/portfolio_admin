import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { headerModel } from 'src/app/model/common-model';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.css']
})
export class TechnologyListComponent implements OnInit {
  displayedColumns: String[] = ['index', 'name', 'colorCode', 'preview', 'Actions'];
  listDataSource: any;
  technologyGroupForm!: FormGroup;
  isEdit: boolean = false;
  editDetails: any = {};
  userId = '665db6f0aff325435c95713e';
  TechnologyGroupHeader: headerModel = {
    heading: 'Technology',
    subHeading: 'Yours Technologies will displayed here',
    buttonName: "Add Technology",
    buttonFunction: 'addtechnologyGroups',
    iconName: 'computer'
  }
  @ViewChild('addtechnologyGroupTemplate', { static: true }) addtechnologyGroupTemplate!: TemplateRef<any>;
  constructor(
    private http: HttpClient, private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.technologyGroupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      colorCode: new FormControl("#000000"),
    })
  }
  ngOnInit(): void {
    this.gettechnologyGroups();
  }
  gettechnologyGroups() {
    this.http.get('http://localhost:3000/technology').subscribe((data) => {
      console.log(data);
      this.listDataSource = new MatTableDataSource(this.processData(data));
    }, err => {
      this._snackBar.open("Failed to get technology group Details.Error Message:" + err.message, 'close');
      console.log("error while getting technologyGroup");
    })
  }
  addtechnologyGroups() {
    this.dialog.open(this.addtechnologyGroupTemplate, { disableClose: true, width: '600px' });
  }
  savetechnologyGroup() {
    console.log(this.technologyGroupForm.value);
    let payload = this.technologyGroupForm.value;
    if (!this.isEdit) {
      this.http.post('http://localhost:3000/technology', this.technologyGroupForm.value).subscribe((data) => {
        this._snackBar.open("Successfully saved!", 'X');
        this.closeDialog();
        this.gettechnologyGroups();
      }, (err) => {
        this._snackBar.open("Failed to save!Error Message:" + err.message, 'X');
      })
    }
    else {
      payload = this.technologyGroupForm.value;
      payload['_id'] = this.editDetails?._id;
      this.http.put('http://localhost:3000/technology', this.technologyGroupForm.value).subscribe((data) => {
        this._snackBar.open("Successfully updated.", 'X');
        this.closeDialog();
        this.gettechnologyGroups();
      }, (err) => {
        this._snackBar.open("Failed to update!Error Message:" + err.message, 'X');
      })

      this.closeDialog();
    }
  }
  processData(data: any) {
    data = data.map((e: any, index: number) => { return { _id: e._id, index: index + 1, name: e.name ?? 'N/A', colorCode: e.colorCode ?? 'N/A' } })
    return data;
  }
  edittechnologyGroup(data: any) {
    this.editDetails = data;
    this.technologyGroupForm.get('name')?.setValue(data?.name);
    this.technologyGroupForm.get('colorCode')?.setValue(data?.colorCode);
    this.technologyGroupForm.get('imageUrl')?.setValue(data?.imageUrl);
    this.isEdit = true;
    this.addtechnologyGroups();
  }
  deletetechnologyGroup(_id: any) {
    this.http.delete(`http://localhost:3000/technology?_id=${_id}`).subscribe((data) => {
      this._snackBar.open("Successfully deleted!", 'X');
      this.gettechnologyGroups();
    }, err => {
      this._snackBar.open("Failed to delete!Error Message:" + err.message, 'X');
    })
  }
  closeDialog() {
    this.isEdit = false;
    this.editDetails = {};
    this.technologyGroupForm.reset();
    this.technologyGroupForm.get('name')?.setValue(null);
    this.technologyGroupForm.get('colorCode')?.setValue('#000000');
    this.dialog.closeAll();
  }
  eventHandle(event: any) {
    console.log("Event...emitted...", event);
    (this as any)[event]();
  };
}