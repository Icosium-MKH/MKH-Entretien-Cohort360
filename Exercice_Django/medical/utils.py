from rest_framework.pagination import PageNumberPagination

class PrescriptionPagination(PageNumberPagination):
    page_size = 20