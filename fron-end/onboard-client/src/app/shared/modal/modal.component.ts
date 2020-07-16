import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    this.elRef.nativeElement.remove();
  }

  onDismiss() {
    this.dismiss.emit();
  }

}
