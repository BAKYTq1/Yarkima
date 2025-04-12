from django.db import models

class TimeAbstract(models.Model):
    
    created_at = models.DateField('created', auto_now_add=True)
    updated_at = models.DateField('updated', auto_now=True)
    
    class Meta:
        abstract = True
        
class Answer(models.Model):
    
    class Meta:
        verbose_name_plural = 'отзывы'
        verbose_name = 'отзыв'
        
    answer = models.CharField('отзыв', max_length=500)
    
    

# Create your models here. hhhh ggg
