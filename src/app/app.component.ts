import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-crud';
  name:string='';
  pendingItems:string[]=[];
  completeItems:string[]=[];
  editIndex:number|null=null;

  save(){
    //Update
    if(this.editIndex!=null){
      this.pendingItems=this.pendingItems.map((val,i)=>{
        if(this.editIndex == i){
          val = this.name
        }
        return val;
      })
    }else{
      //Create
      this.pendingItems.push(this.name);
    }
    this.name=''
    this.editIndex=null
  }

  edit(editIndex:number){
    this.editIndex=editIndex
    const editData=this.pendingItems.find((val,i)=>{
      return editIndex == i
    })
    if(editData){
      this.name=editData
    }
  }

  deleteItem(itemIndex:number){
    this.pendingItems=this.pendingItems.filter((val,i)=>{
      return itemIndex != i
    })
  }

  completeItem(itemIndex:number){
    const completeData = this.pendingItems.find((val,i)=>{
      return itemIndex==i
    })
    this.pendingItems=this.pendingItems.filter((val,i)=>{
      return itemIndex != i //After complete, the item should not present in the pending items
    })
    if(completeData){
      this.completeItems.push(completeData)
    }
  }
 
}
