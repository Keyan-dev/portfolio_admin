import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonSnackbarService {
  constructor(private _snackBar: MatSnackBar) { }
  /*
   *Function used to open custom snackbar
  */
  openCustomSnackBar(displayMessage: string, actionMessage: string, type: string, duration: number, x: MatSnackBarHorizontalPosition, y: MatSnackBarVerticalPosition
  ): any {
    console.log("panelclass..", `${type}_snack_bar`);
    return this._snackBar.open(displayMessage, actionMessage, {
      panelClass: [`${type}_snack_bar`],
      duration: duration,
      horizontalPosition: x,
      verticalPosition: y
    })
  }
}
