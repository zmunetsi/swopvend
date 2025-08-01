# Generated by Django 5.1.9 on 2025-07-24 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0009_alter_item_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='status',
            field=models.CharField(choices=[('available', 'Available'), ('swapped', 'Swapped'), ('given', 'Given Away'), ('processing', 'Processing'), ('archived', 'Archived')], default='available', max_length=20),
        ),
    ]
