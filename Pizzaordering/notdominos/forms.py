import datetime
from .models import Order
from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import CheckboxSelectMultiple
from django.db import transaction
from django.core.exceptions import ValidationError


class PizzaForm(forms.ModelForm):
    class Meta:
        model = Pizza
        fields = ['size', 'crust', 'sauce', 'cheese', 'toppings']
        widgets = {
            'toppings': CheckboxSelectMultiple(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['size'].queryset = Size.objects.all()
        self.fields['crust'].queryset = Crust.objects.all()
        self.fields['sauce'].queryset = Sauce.objects.all()
        self.fields['cheese'].queryset = Cheese.objects.all()
        self.fields['toppings'].queryset = Topping.objects.all()


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['name', 'street_address', 'city', 'county', 'zip_code', 'country', 'card_number',
                  'card_expiry_month', 'card_expiry_year', 'card_cvv', 'delivery_date', 'delivery_time']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'street_address': forms.TextInput(attrs={'class': 'form-control'}),
            'city': forms.TextInput(attrs={'class': 'form-control'}),
            'county': forms.TextInput(attrs={'class': 'form-control'}),
            'zip_code': forms.TextInput(attrs={'class': 'form-control'}),
            'country': forms.TextInput(attrs={'class': 'form-control'}),
            'card_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '1234 5678 9012 3456', 'inputmode': 'numeric', 'pattern': '[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'}),
            'card_expiry_month': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'MM', 'maxlength': '2', 'pattern': '[0-9]{2}', 'inputmode': 'numeric', 'min': '1', 'max': '12'}),
            'card_expiry_year': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'YYYY', 'maxlength': '4', 'pattern': '[0-9]{4}', 'inputmode': 'numeric', 'min': '2024', 'max': '2050'}),
            'card_cvv': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '123', 'maxlength': '3'}),
            'delivery_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date', 'format': 'yyyy-mm-dd'}),
            'delivery_time': forms.TimeInput(attrs={'class': 'form-control', 'type': 'time'}),
        }

        def clear(self):
            cleaned_data = super().clean()
            delivery_date = cleaned_data.get('delivery_date')
            delivery_time = cleaned_data.get('delivery_time')
            card_expiry_month = cleaned_data.get(
                'card_expiry_month')  # Fix: Added this line
            card_expiry_year = cleaned_data.get(
                'card_expiry_year')  # Fix: Added this line
            if delivery_date < datetime.date.today():
                raise ValidationError('Delivery date cannot be in the past')
            if delivery_date == datetime.date.today() and delivery_time < datetime.datetime.now().time():
                raise ValidationError('Delivery time cannot be in the past')
            if card_expiry_month < datetime.date.today().month and card_expiry_year == datetime.date.today().year:
                raise ValidationError('Card has expired')
            if card_expiry_year < datetime.date.today().year:
                raise ValidationError('Card has expired')


class UserSignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = False
        user.email = self.cleaned_data['username']
        user.save()
        return user


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)