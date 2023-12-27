from django import forms
from django.db import models

class LiderModel(models.Model):
    nome = models.CharField(max_length=255)
    departamento = models.CharField(max_length=255)
    email = models.EmailField()
    senha = models.CharField(max_length=255)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nome} - {self.email} - {self.departamento}"
    
class LiderForm(forms.ModelForm):
    class Meta:
        model = LiderModel
        fields = ['nome', 'departamento', 'email', 'senha']
