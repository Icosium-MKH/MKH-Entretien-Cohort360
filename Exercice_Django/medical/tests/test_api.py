from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from datetime import date

from medical.models import Patient, Medication, Prescription


class ApiListTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Patients
        patient1 = Patient.objects.create(last_name="Martin", first_name="Jeanne", birth_date="1992-03-10")
        patient2 = Patient.objects.create(last_name="Durand", first_name="Jean", birth_date="1980-05-20")
        patient3= Patient.objects.create(last_name="Bernard", first_name="Paul")

        # Medications
        medication1 = Medication.objects.create(code="PARA500", label="Paracétamol 500mg", status=Medication.STATUS_ACTIF)
        medication2 = Medication.objects.create(code="IBU200", label="Ibuprofène 200mg", status=Medication.STATUS_SUPPR)

        #Prescriptions
        Prescription.objects.create(
            patient=patient1,
            medication=medication1,
            start_date=date.today(),
            end_date=date.today(),
            status=Prescription.STATUS_VALID,
            comment="test prescription 001"
        )
        Prescription.objects.create(
            patient=patient2,
            medication=medication1,
            start_date=date.today(),
            end_date=date.today(),
            status=Prescription.STATUS_PENDING,
            comment="test prescription 001"
        )
        Prescription.objects.create(
            patient=patient3,
            medication=medication2,
            start_date=date.today(),
            end_date=date.today(),
            status=Prescription.STATUS_SUPPR,
            comment="test prescription 001"
        )

    def test_patient_list(self):
        url = reverse("patient-list")
        r = self.client.get(url)
        self.assertEqual(r.status_code, 200)
        self.assertGreaterEqual(len(r.json()), 3)

    def test_patient_filter_nom(self):
        url = reverse("patient-list")
        r = self.client.get(url, {"nom": "mart"})
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(all("mart" in p["last_name"].lower() for p in data))

    def test_patient_filter_date(self):
        url = reverse("patient-list")
        r = self.client.get(url, {"date_naissance": "1980-05-20"})
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(all(p["birth_date"] == "1980-05-20" for p in data))

    def test_medication_list(self):
        url = reverse("medication-list")
        r = self.client.get(url)
        self.assertEqual(r.status_code, 200)
        self.assertGreaterEqual(len(r.json()), 2)

    def test_medication_filter_status(self):
        url = reverse("medication-list")
        r = self.client.get(url, {"status": "actif"})
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(all(m["status"] == "actif" for m in data))

    def test_prescription_list(self):
        url = reverse("prescription-list")
        r = self.client.get(url)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn("results", data)
        self.assertGreaterEqual(len(data["results"]), 3)

    def test_prescription_filter_status(self):
        url = reverse("prescription-list")
        r = self.client.get(url, {"status": Prescription.STATUS_VALID})
        self.assertEqual(r.status_code, 200)
        data = r.json()["results"]
        self.assertTrue(
            all(p["status"] == Prescription.STATUS_VALID for p in data)
        )

    def test_prescription_filter_patient(self):
        patient = Patient.objects.get(last_name="Martin")
        url = reverse("prescription-list")
        r = self.client.get(url, {"patient": patient.id})
        self.assertEqual(r.status_code, 200)
        data = r.json()["results"]
        self.assertTrue(
            all(p["patient"] == patient.id for p in data)
        )

    def test_prescription_filter_start_date_gte(self):
        today = date.today()
        url = reverse("prescription-list")
        r = self.client.get(url, {"start_date__gte": today.isoformat()})
        self.assertEqual(r.status_code, 200)
        data = r.json()["results"]
        self.assertTrue(
            all(p["start_date"] >= today.isoformat() for p in data)
        )
