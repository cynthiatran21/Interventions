import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
  //   let saisiePrenom = component.problemeForm.controls['prenom'];
  //   saisiePrenom.setValue('a'.repeat(2
  //     ))
  //   expect(saisiePrenom.valid).toBeFalsy();
  //  })

  //  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
  //   let saisiePrenom = component.problemeForm.controls['prenom'];
  //   saisiePrenom.setValue('a'.repeat(3))
  //   expect(saisiePrenom.valid).toBeTruthy();
  //  })

   it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(199))
    expect(saisiePrenom.valid).toBeTruthy();
   })
});
