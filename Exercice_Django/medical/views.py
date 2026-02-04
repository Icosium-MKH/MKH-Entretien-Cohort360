from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet

from .models import Patient, Medication, Prescription
from .filters import PatientFilter, MedicationFilter
from .serializers import PatientSerializer, MedicationSerializer, PrescriptionSerializer


class PatientViewSet(viewsets.ReadOnlyModelViewSet):
    """Lecture seule des patients avec filtrage via query params."""

    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = PatientFilter


class MedicationViewSet(viewsets.ReadOnlyModelViewSet):
    """Lecture seule des médicaments avec filtrage via query params."""

    serializer_class = MedicationSerializer
    queryset = Medication.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = MedicationFilter


class PrescriptionViewSet(ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "patient": ["exact"],
        "medication": ["exact"],
        "status": ["exact"],
        "start_date": ["gte", "lte"],
        "end_date": ["gte", "lte"],
    }

    """COMM_MKH
    Choix du ModelViewSet :
    L'héritage depuis cette classe permet à notre modèle d'avoir automatiquement :
        - GET /prescriptions/ → liste (avec filtres)
        - GET /prescriptions/{id}/ → détail
        - POST /prescriptions/ → création
        - PUT /prescriptions/{id}/ → mise à jour complète
        - PATCH /prescriptions/{id}/ → mise à jour partielle
        - DELETE /prescriptions/{id}/ → suppression
    """