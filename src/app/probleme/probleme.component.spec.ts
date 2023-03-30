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

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(2));
    expect(saisiePrenom.valid).toBeFalsy();
  })

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(3));
    expect(saisiePrenom.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(200));
    expect(saisiePrenom.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('');
    let errors = saisiePrenom.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue(' '.repeat(10));
    expect(saisiePrenom.valid).toBeFalse();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue("  a")
    expect(saisiePrenom.valid).toBeFalse();
  });
});
