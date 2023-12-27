from django.shortcuts import render, redirect
from index.models.lider_model import LiderForm, LiderModel

def lider(request):
    lideres = LiderModel.objects.all()
    return render(request, 'lider.html', {'lideres': lideres})

def criar_editar_lider(request, lider_id=None):
    # Verifique se o líder existe (para edição) ou crie um novo (para criação)
    if lider_id:
        lider = LiderModel.objects.get(pk=lider_id)
    else:
        lider = LiderModel()

    if request.method == 'POST':
        # Crie um formulário com os dados do POST e os dados existentes do líder
        form = LiderForm(request.POST, instance=lider)
        if form.is_valid():
            form.save()
            return redirect('/lider')
    else:
        # Crie um formulário vazio (ou preenchido com os dados existentes do líder)
        form = LiderForm(instance=lider)

    return render(request, 'formulario.html', {'form': form})