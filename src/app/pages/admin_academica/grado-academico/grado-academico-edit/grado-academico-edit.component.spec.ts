import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoAcademicoEditComponent } from './grado-academico-edit.component';

describe('GradoAcademicoEditComponent', () => {
  let component: GradoAcademicoEditComponent;
  let fixture: ComponentFixture<GradoAcademicoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradoAcademicoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradoAcademicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
