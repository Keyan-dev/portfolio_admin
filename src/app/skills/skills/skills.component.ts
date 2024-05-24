import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillGroupForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.skillGroupForm = this.formBuilder.group({
      skills: this.formBuilder.array([this.createSkillGroup()])
    })
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
  get getSkillGroupArray(): FormArray {
    return this.skillGroupForm.get('skills') as FormArray;
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
