# Generated by Django 4.0.3 on 2023-07-25 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='PENDING', max_length=200),
        ),
    ]
