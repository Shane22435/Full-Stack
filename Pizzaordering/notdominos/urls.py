from django.urls import path, include
from . import views
from .forms import *

urlpatterns = [
    path('', views.index, name="index"),
    path('contact.html', views.contact, name ="contact"),
    path("order.html", views.order, name="order"),
    path('register/', views.UserSignupView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(template_name="login.html",
         authentication_form=UserLoginForm), name="login"),
    path('logout/', views.logout_user, name="logout"),
    path('orders/', views.orders_history, name="orders_history"),
    path('order/', views.order, name="order"),
    path('orders/delivery_details/',
         views.delivery_details, name="delivery_details"),
    path('orders/order_confirmation/<int:order_id>/', views.order_confirmation,
         name="order_confirmation"),
]