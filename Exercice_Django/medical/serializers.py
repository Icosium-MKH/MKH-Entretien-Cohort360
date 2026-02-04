from rest_framework import serializers
from .models import Patient, Medication, Prescription


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "last_name", "first_name", "birth_date"]


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ["id", "code", "label", "status"]


class PrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.__str__", read_only=True)
    medication_name = serializers.CharField(source="medication.__str__", read_only=True)

    class Meta:
        model = Prescription
        fields = [
            "id",
            "medication",
            "medication_name",
            "patient",
            "patient_name",
            "start_date",
            "end_date",
            "status",
            "comment",
        ]