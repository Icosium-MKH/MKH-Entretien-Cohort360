from django.db import models
from django.core.exceptions import ValidationError

class Patient(models.Model):
    """Représente un patient."""

    last_name = models.CharField(max_length=150)
    first_name = models.CharField(max_length=150)
    birth_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["last_name", "first_name", "id"]

    def __str__(self) -> str:  # pragma: no cover - simple repr
        return f"{self.last_name} {self.first_name}"


class Medication(models.Model):
    """Représente un médicament."""

    STATUS_ACTIF = "actif"
    STATUS_SUPPR = "suppr"
    STATUS_CHOICES = (
        (STATUS_ACTIF, "actif"),
        (STATUS_SUPPR, "suppr"),
    )

    code = models.CharField(max_length=64, unique=True)
    label = models.CharField(max_length=255)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_ACTIF)

    class Meta:
        ordering = ["code"]

    def __str__(self) -> str:  # pragma: no cover - simple repr
        return f"{self.code} - {self.label} ({self.status})"


class  Prescription(models.Model):
    """Représente une préscription"""

    STATUS_VALID = "valide"
    STATUS_PENDING = "en_attente"
    STATUS_SUPPR = "suppr"
    STATUS_CHOICES = (
        (STATUS_VALID, "valide"),
        (STATUS_PENDING, "en_attente"),
        (STATUS_SUPPR, "suppr"),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=False, blank=False)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE, null=False, blank=False)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_VALID)
    comment = models.CharField(max_length=255, blank=True)

    def clean(self):
        #La date de fin doit être postérieure ou égale à la date de début
        if self.end_date < self.start_date:
            raise ValidationError("La date de fin ne peut être avant la date de début")

        #Le patient et le médicament doivent exister dans le système
        if not self.patient or not self.medication:
            raise ValidationError("Le patient et le médicament sont obligatoire pour la prescription")

    #Une prescription invalide ne doit pas pouvoir être sauvegardée
    def save(self,*args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)