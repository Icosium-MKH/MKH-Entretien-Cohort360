from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet
from .utils import PrescriptionPagination
from rest_framework import status
from rest_framework.response import Response

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
    pagination_class = PrescriptionPagination

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "patient": ["exact"],
        "medication": ["exact"],
        "status": ["exact"],
        "start_date": ["gte"],
        "end_date": ["lte"],
    }

    def destroy(self, request, *args, **kwargs):
        return Response(
            {"detail": "Suppression interdite"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    """COMM_MKH
    Choix du ModelViewSet :
    L'héritage depuis cette classe permet à notre modèle d'avoir automatiquement :
        - GET /prescriptions/
        - GET /prescriptions/{id}/
        - POST /prescriptions/
        - PUT /prescriptions/{id}/
        - PATCH /prescriptions/{id}/

        - DELETE /prescriptions/{id}/
          (désactivée via une surcharge de destroy étant donné que ça ne fait pas partie du scope de l'exercice)
    """