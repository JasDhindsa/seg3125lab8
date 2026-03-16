import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { tutors } from "../data/mockData";
import { Calendar, Clock, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function BookSessionPage() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const navigate = useNavigate();
  const tutor = tutors.find((t) => t.id === tutorId);

  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tutor not found</h1>
        </div>
      </div>
    );
  }

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1 && !selectedSubject) {
      newErrors.subject = "Please select a subject";
    }
    if (currentStep === 2 && !selectedDay) {
      newErrors.day = "Please select a day";
    }
    if (currentStep === 2 && !selectedTime) {
      newErrors.time = "Please select a time";
    }
    if (currentStep === 3 && !selectedDuration) {
      newErrors.duration = "Please select a session duration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
        setErrors({});
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleConfirm = () => {
    if (validateStep(step)) {
      const bookingId = `booking-${Date.now()}`;
      navigate(`/confirmation/${bookingId}`);
    }
  };

  const calculateTotal = () => {
    if (!selectedDuration) return 0;
    const duration = parseInt(selectedDuration);
    return (tutor.pricePerHour * duration) / 60;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Session</h1>
        <p className="text-gray-600 mb-8">with {tutor.name}</p>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Select Subject</span>
            <span className="text-xs text-gray-600">Choose Time</span>
            <span className="text-xs text-gray-600">Confirm</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Step 1: Select Subject"}
              {step === 2 && "Step 2: Choose Date & Time"}
              {step === 3 && "Step 3: Session Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Select Subject */}
            {step === 1 && (
              <div>
                <Label className="text-base mb-3 block">What subject would you like help with?</Label>
                <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
                  <div className="space-y-3">
                    {tutor.subjects.map((subject) => (
                      <div
                        key={subject}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedSubject === subject
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedSubject(subject)}
                      >
                        <RadioGroupItem value={subject} id={subject} />
                        <Label htmlFor={subject} className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{subject}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {errors.subject && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.subject}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 2: Choose Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Day
                  </Label>
                  <RadioGroup value={selectedDay} onValueChange={setSelectedDay}>
                    <div className="space-y-2">
                      {daysOfWeek.map((day) => (
                        <div
                          key={day}
                          className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedDay === day
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedDay(day)}
                        >
                          <RadioGroupItem value={day} id={day} />
                          <Label htmlFor={day} className="flex-1 cursor-pointer font-medium">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {errors.day && (
                    <Alert variant="destructive" className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.day}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {selectedDay && tutor.availability[selectedDay] && (
                  <div>
                    <Label className="text-base mb-3 block flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Select Time
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {tutor.availability[selectedDay].map((time) => (
                        <Badge
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            selectedTime === time
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                    {errors.time && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.time}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirm Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Session Duration</Label>
                  <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration}>
                    <div className="space-y-3">
                      {["60", "90", "120"].map((duration) => (
                        <div
                          key={duration}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedDuration === duration
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedDuration(duration)}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={duration} id={`duration-${duration}`} />
                            <Label htmlFor={`duration-${duration}`} className="cursor-pointer">
                              <div className="font-medium">{duration} minutes</div>
                            </Label>
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${((tutor.pricePerHour * parseInt(duration)) / 60).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {errors.duration && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.duration}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tutor:</span>
                      <span className="font-medium">{tutor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-medium">{selectedSubject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Day:</span>
                      <span className="font-medium">{selectedDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedDuration} minutes</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="font-bold text-lg text-blue-600">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
                  Confirm Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
