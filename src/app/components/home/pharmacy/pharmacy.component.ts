import { style, transition, trigger, animate } from '@angular/animations';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({opacity:0, marginTop:20}),
        animate(1000),
      ])
    ])
  ]
})
export class PharmacyComponent{

  title: string = 'AGM project';
  // latitude: number = 0;
  // longitude: number = 0;
  // zoom: number = 20;
  textChosen = "No file chosen";
  address: string = '';
  private geoCoder:any;
  pharmacyForm: FormGroup;
  afuConfig = {
    formatsAllowed: ".jpg,.png",
    uploadAPI: {
      url:"https://example-file-upload-api"
    },
    maxSize:3
  };

  latitude = 51.678418;
  longitude = 7.809007;
  zoom = 8;
  location: string = '';
  
  @ViewChild('search')
  public searchElementRef:any;

  constructor(private authService: AuthService, private router: Router, 
    private dialog: MatDialog,//private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { //public searchElementRef: ElementRef
    this.pharmacyForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      patientName: new FormControl(''),
      age: new FormControl('',[Validators.required]),
      phoneNo: new FormControl('',[Validators.required]),
      whatsappNo: new FormControl(''),
      address: new FormControl('',[Validators.required]),
      gender: new FormControl(null),
      substitute: new FormControl(null),
      allergy: new FormControl(null),
      allergicNote: new FormControl(''),
      comment: new FormControl(''),
      location: new FormControl('',[Validators.required]),
      prescription: new FormControl()
    });

    this.pharmacyForm.controls['gender'].setValue('1', { onlySelf: true });
    this.pharmacyForm.controls['substitute'].setValue('1', { onlySelf: true });
    this.pharmacyForm.controls['allergy'].setValue('1', { onlySelf: true });
  }
  
 
  get f(){
    return this.pharmacyForm.controls;
  }

  selectFile():void{

  }

  onChoseLocation(event:any){
    console.log(event);
    alert(event);
  }

  ngOnInit() {
    // this.mapsAPILoader.load().then(() => {
    //   //this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    //   console.log(this.geoCoder);
    // });
  }

  onSubmit() {
    console.log(this.pharmacyForm.value);
    if(this.pharmacyForm.valid){
      this.authService.pharmacy(this.pharmacyForm.value).subscribe(result=>{
        if(result.success){
          this.dialog.open(DialogComponent)
        }else{
          this.router.navigateByUrl('/login');
        }
      });
    }
  }

  onAddressChange(event:any) {
    console.log('print')
    this.location = event;
    console.log(`Address is ${event}`)
  }

  locationn(event:any){
    console.log(event)
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 18;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  
  // getAddress(latitude:number, longitude:number) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //         //console.log(this.address);
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
    
  //   });
  // }

}
