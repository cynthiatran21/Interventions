import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypesproblemeService } from './typesprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [TypesproblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let saisiePrenom = component.problemeForm.controls['prenom'];
    saisiePrenom.setValue('a'.repeat(2));
    expect(saisiePrenom.valid).toBeFalsy();
  });

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
    saisiePrenom.setValue('  a');
    expect(saisiePrenom.valid).toBeFalse();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let saisieTelephone = component.problemeForm.get('telephone');
    expect(saisieTelephone.disabled).toBeTruthy();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('');
    expect(saisieTelephone.value).toBe('');
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    expect(saisieCourriel.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('PasNotifier');

    let saisieCourrielConfirmation = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    expect(saisieCourrielConfirmation.disabled).toBeTruthy();
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");

    let saisieTelephone = component.problemeForm.get('telephone');
    expect(saisieTelephone.disabled).toBeTruthy();
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    expect(saisieCourriel.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");

    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(saisieCourrielConfirmation.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('');
    expect(saisieCourriel.valid).toBeFalsy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");

    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    saisieCourrielConfirmation.setValue('');
    expect(saisieCourrielConfirmation.valid).toBeFalsy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.gestionNotification("ParCourriel");

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('courrielNonConforme');
    expect(saisieCourriel.valid).toBeFalsy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.gestionNotification("ParCourriel");
    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('');
    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    saisieCourrielConfirmation.setValue('abc@.ca');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeFalse();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.gestionNotification("ParCourriel");
    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('abc@.ca');
    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    saisieCourrielConfirmation.setValue('');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeFalse();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");
    let errors = {};

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('abc@.ca');
    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    saisieCourrielConfirmation.setValue('def@.ca');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {};
    expect(errors['match']).toBeFalse();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotification("ParCourriel");
    let errors = {};

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    saisieCourriel.setValue('abc@.ca');
    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    saisieCourrielConfirmation.setValue('abc@.ca');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {};
    expect(errors['match']).toBeTrue();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    expect(saisieTelephone.enabled).toBeTruthy();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieCourriel = component.problemeForm.get('courrielGroup.courriel');
    expect(saisieCourriel.disabled).toBeTruthy();
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(saisieCourrielConfirmation.disabled).toBeTruthy();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('');
    expect(saisieTelephone.valid).toBeFalse();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('caractereNomNumerique');
    expect(saisieTelephone.valid).toBeFalse();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('123456789');
    expect(saisieTelephone.valid).toBeFalse();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('12345678910');
    expect(saisieTelephone.valid).toBeFalse();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification("ParTelephone");

    let saisieTelephone = component.problemeForm.get('telephone');
    saisieTelephone.setValue('1234567891');
    expect(saisieTelephone.valid).toBeTrue();
  });
});
