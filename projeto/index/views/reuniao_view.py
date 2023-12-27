from django.shortcuts import render

def reuniao(request):
    return render(request, 'reuniao.html')