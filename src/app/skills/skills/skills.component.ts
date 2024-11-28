import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout/flex';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [FlexModule, MatButtonModule, ReactiveFormsModule, MatIconModule, NgFor, MatFormFieldModule, MatInputModule]
})
export class SkillsComponent implements OnInit {
  skillGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.skillGroupForm = this.formBuilder.group({
      skills: this.formBuilder.array([this.createSkillGroup()])
    })
  }

  get getSkillGroupArray(): FormArray {
    return this.skillGroupForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
    console.log(this.skillGroupForm);
  }

  createSkillGroup(): FormGroup {
    return this.formBuilder.group({
      skillGroupName: [''],
      skill: this.formBuilder.array([this.createSkill()])
    });
  }

  createSkill(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      imageDir: [''],
      description: ['']
    });
  }

  getSkills(skillGroupIndex: number): FormArray {
    return this.getSkillGroupArray.at(skillGroupIndex).get('skill') as FormArray;
  }

  addSkillGroup() {
    (this.skillGroupForm.get('skills') as FormArray).controls.push(this.createSkillGroup());
  }

  addSkill(skillGroupIndex: number) {
    (this.getSkillGroupArray.at(skillGroupIndex).get('skill') as FormArray).controls.push(this.createSkill());
  }

  removeSkillGroup(skillGroupFormIndex: number) {
    (this.getSkillGroupArray as FormArray).removeAt(skillGroupFormIndex);
  }

  removeSkill(skillGroupIndex: number, skillIndex: number) {
    console.log(skillGroupIndex, skillIndex);
    (this.getSkillGroupArray.at(skillGroupIndex).get('skill') as FormArray).removeAt(skillIndex);
  }
}
