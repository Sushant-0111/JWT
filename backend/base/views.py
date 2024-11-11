from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status 
from .models import Note

from .serializer import NoteSerializer,UserRegistration

from rest_framework.permissions import IsAuthenticated,AllowAny



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            
            
            access_token = tokens['access']
            refresh_token = tokens['refresh']
            
            res = Response()
            
            
            res.data = ({
                'success': True,
            })
            
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            
            return res
    
    
        except:
    
            return Response({
                'success': False,
            })





class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']
            res = Response()
            res.data = ({
               'refreshed': True,
            })
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None', 
                path='/'
                )
            return res
        except:
            return Response({
                'refreshed': False,
            })
    
@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success': True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success': False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})
     
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
      serializer = UserRegistration(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
      return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    note = Note.objects.filter(owner = user)
    serializer = NoteSerializer(note, many = True)
    return Response(serializer.data)
    

