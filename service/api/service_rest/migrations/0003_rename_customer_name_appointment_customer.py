# Generated by Django 4.0.3 on 2023-07-25 15:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_remove_automobilevo_import_href_automobilevo_sold'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='customer_name',
            new_name='customer',
        ),
    ]
