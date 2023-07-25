# Generated by Django 4.0.3 on 2023-07-24 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('import_href', models.CharField(max_length=200, null=True, unique=True)),
                ('vin', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('employee_id', models.PositiveIntegerField(null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('vip', models.BooleanField(default=False)),
                ('vin', models.CharField(max_length=200)),
                ('reason', models.TextField()),
                ('status', models.BooleanField(default=False)),
                ('customer_name', models.CharField(max_length=200)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_rest.technician')),
            ],
        ),
    ]
