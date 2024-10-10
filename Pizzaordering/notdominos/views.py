from django.shortcuts import render
import re
from django.shortcuts import render, get_object_or_404
import random
from .models import *
from .forms import *
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.utils.timezone import now
from django.http import JsonResponse
# Create your views here.

def index(request):
    return render(request, 'index.html')

def contact(request):
    return render(request, 'contact.html')


class UserSignupView(CreateView):
    model = User
    form_class = UserSignupForm
    template_name = 'user_signup.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('/')


class UserLoginView(LoginView):
    template_name = 'login.html'


def logout_user(request):
    logout(request)
    return redirect("/")


@login_required()
def order(request):
    if request.method == 'POST':
        form = PizzaForm(request.POST)
        if form.is_valid():
            pizza = form.save()
            request.session['pizza_id'] = pizza.id
            return redirect('delivery_details')
    else:
        form = PizzaForm()
    return render(request, 'order.html', {'form': form})


@login_required()
def delivery_details(request):
    pizza_id = request.session.get('pizza_id')
    if not pizza_id:
        return redirect('create_pizza')

    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.save()
            selected_pizza = Pizza.objects.get(pk=pizza_id)
            order.pizza.add(selected_pizza)
            del request.session['pizza_id']
            return redirect('order_confirmation', order_id=order.id)
    else:
        form = OrderForm()
    return render(request, 'delivery_details.html', {'form': form})


@login_required()
def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id)

    # check if the logged in user is the owner of the order
    if request.user != order.user:
        # redirect the user to main page
        return redirect("/orders/")
    return render(request, 'order_confirmation.html', {'order': order})


@login_required()
def orders_history(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    return render(request, 'order_history.html', {'orders': orders})