# Generated by Django 4.0.3 on 2023-07-25 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_sale_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
