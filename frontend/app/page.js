"use client"
import { insertData } from '@/actions/donors.action';
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Heart, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Loader2,
  Info
} from 'lucide-react';

export default function OrganDonorInterface() {
  const [location, setLocation] = useState('Fetching location...');
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    bloodGroup: '',
    organNeeded: '',
    urgency: ''
  });
  const [errors, setErrors] = useState({});

  // 🔁 Reverse Geocoding Function
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.county || 'Unknown';
    } catch (err) {
      console.error('Geocoding error:', err);
      return 'Unknown';
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          const city = await reverseGeocode(latitude, longitude);
          setLocation(`${city} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        },
        () => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.age) newErrors.age = 'Age is required';
    else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 1 and 100';
    }
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.organNeeded) newErrors.organNeeded = 'Organ selection is required';
    if (!formData.urgency) newErrors.urgency = 'Urgency level is required';
    if (!coordinates.latitude || !coordinates.longitude) {
      newErrors.location = 'Location is required for matching';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setResponse('');

    const requestPayload = {
      organ_needed: formData.organNeeded,
      blood_type: formData.bloodGroup,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      urgency: parseInt(formData.urgency)
    };

    try {
      const res = await fetch('http://localhost:8000/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const responseData = await res.json();

      let formattedResponse = `Top Donor Matches:\n\n`;
      if (responseData.top_matches && responseData.top_matches.length > 0) {
        responseData.top_matches.forEach((match, index) => {
          formattedResponse += `${index + 1}. ${match.name || 'Anonymous'}\n`;
          formattedResponse += `   Blood Type: ${match.blood_type}\n`;
          formattedResponse += `   Health Status: ${match.health_status}\n`;
          formattedResponse += `   Distance: ${match.distance_km} km\n`;
          formattedResponse += `   Location: ${match.city || 'Unknown'}\n\n`;
        });
      } else {
        formattedResponse += 'No matches found.\n\n';
      }

      if (responseData.llm_ranking) {
        formattedResponse += `AI Analysis:\n${responseData.llm_ranking}`;
      }

      setResponse(formattedResponse);
    } catch (err) {
      console.error('Error:', err);
      setResponse(`Error connecting to matching service: ${err.message}`);
    }
    setLoading(false);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const organs = ['Kidney', 'Liver', 'Heart', 'Lung', 'Pancreas', 'Intestine'];
  const urgencyLevels = [
    { value: 1, label: '1 - Very Low Priority', color: 'bg-green-100 text-green-800' },
    { value: 2, label: '2 - Low Priority', color: 'bg-blue-100 text-blue-800' },
    { value: 3, label: '3 - Moderate Priority', color: 'bg-yellow-100 text-yellow-800' },
    { value: 4, label: '4 - High Priority', color: 'bg-orange-100 text-orange-800' },
    { value: 5, label: '5 - Critical/Emergency', color: 'bg-red-100 text-red-800' }
  ];

  const getUrgencyBadge = (level) => {
    const urgencyInfo = urgencyLevels.find(u => u.value === parseInt(level));
    return urgencyInfo ? (
      <Badge variant="outline" className={urgencyInfo.color}>
        {urgencyInfo.label}
      </Badge>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Organ Donor Matching System
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect patients with compatible organ donors using AI-powered matching and location-based search
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Patient Information
              </CardTitle>
              <CardDescription>
                Please provide your medical information for donor matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age Field */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
                  <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(100)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errors.age}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="text-sm font-medium">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                  <SelectTrigger className={errors.bloodGroup ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((bg) => (
                      <SelectItem key={bg} value={bg}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          {bg}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bloodGroup && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errors.bloodGroup}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Location
                </Label>
                <div className="relative">
                  <Input
                    value={location}
                    readOnly
                    className="bg-muted/50 pr-10"
                  />
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                </div>
                {errors.location && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errors.location}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Organ Needed */}
              <div className="space-y-2">
                <Label htmlFor="organNeeded" className="text-sm font-medium">Organ Needed</Label>
                <Select value={formData.organNeeded} onValueChange={(value) => handleInputChange('organNeeded', value)}>
                  <SelectTrigger className={errors.organNeeded ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select required organ" />
                  </SelectTrigger>
                  <SelectContent>
                    {organs.map((organ) => (
                      <SelectItem key={organ} value={organ}>
                        {organ}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.organNeeded && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errors.organNeeded}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-sm font-medium">Urgency Level</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                  <SelectTrigger className={errors.urgency ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={String(level.value)}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.urgency && (
                  <div className="mt-2">
                    {getUrgencyBadge(formData.urgency)}
                  </div>
                )}
                {errors.urgency && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errors.urgency}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Matches...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Find Compatible Donors
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-500" />
                Matching Results
              </CardTitle>
              <CardDescription>
                AI-powered donor matching results will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!response ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete the form and click "Find Compatible Donors" to see matching results
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Separator />
                  <div className="bg-muted/30 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                      {response}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            This system helps connect patients with potential organ donors. 
            Always consult with medical professionals for actual transplant procedures.
          </p>
        </div>
      </div>
    </div>
  );
}