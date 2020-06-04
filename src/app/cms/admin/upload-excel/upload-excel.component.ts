import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { VendorInfo } from '../vendorInfo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminVendorService } from '../admin-vendor.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {
  data: any;
  bulkData: VendorInfo[] = [];
  fileForm: FormGroup;
  errorMessage: any;
  showOverlay: boolean = false;

  constructor(private fb: FormBuilder, private vendorService: AdminVendorService) { }

  ngOnInit() {
    this.fileForm = this.fb.group({
      file:''
    })
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.data.forEach(element => {
        if(element.length > 8 && element[7].toLowerCase() !== "status") {
          const newData = {
            "companyName":element[1],
            "address":element[2],
            "location":element[3],
            "companyCode": element[4],
            "contactPerson":element[5],
            "telephoneNumber":`0${element[6]}`,
            "status":element[7],
            "remarks":element[8]
          };
          this.bulkData.push(newData);
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  cancel() {
    this.fileForm.reset();
    this.bulkData=[];
  }

  saveBulk() {console.log(JSON.stringify(this.bulkData));
    this.showOverlay = true;
    this.vendorService.saveBulkData(this.bulkData).subscribe(
      () => this.onSaveComplete(),
      (error: any) => {
        this.errorMessage = "An error occurred please try again try again later";
        this.showOverlay = false;
      }
    );
    // cleaar error after 5s
    if(this.errorMessage) {
      setTimeout(()=>this.errorMessage = '', 5000)
    }
  }
  onSaveComplete(): void {
    this.showOverlay = false;
    this.fileForm.reset();
    this.bulkData=[];
  }
}
