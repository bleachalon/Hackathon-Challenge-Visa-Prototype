import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    type: string;
    message: string;
    amount: number;
    hide: boolean;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    dialogData: DialogData;
    title:string;
    message:string;
    amount: number;
    type: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {

    }

    close() {
        this.dialogRef.close();
    }

    onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
    }

    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
    }
}
