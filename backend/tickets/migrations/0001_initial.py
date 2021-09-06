# Generated by Django 3.2.6 on 2021-09-06 11:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('OP', 'Open'), ('CL', 'Closed'), ('PE', 'Pending'), ('RE', 'Resolved'), ('WB', 'Waiting on Branch'), ('W3', 'Waiting on 3rd Party')], default='OP', max_length=2)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_tickets', to=settings.AUTH_USER_MODEL)),
                ('destination', models.ManyToManyField(related_name='profiles', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(related_name='profiles', to='auth.Group')),
            ],
        ),
    ]
