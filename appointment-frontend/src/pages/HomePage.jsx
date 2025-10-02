// HomePage.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import { CalendarIcon, ClockIcon, ShieldCheckIcon } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MedBook</span>

            </div>
            <div className="flex items-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={() => navigate('dashboard')}>
                Guest Mode</Button>

            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Book Your Medical <span className="block text-blue-600">Appointments Online</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Schedule appointments with healthcare professionals quickly and easily.
              Manage your healthcare appointments in one convenient place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={() => navigate('/login')}>
                Login into your Account
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => navigate('/signup')}>
                Create a new Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MedBook?</h2>
            <p className="text-lg text-gray-600">Simple, secure, and efficient appointment booking</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <CalendarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Easy Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  View available time slots and book your appointment in just a few clicks.
                  No phone calls needed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <ClockIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>24/7 Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Book appointments anytime, anywhere. Manage your healthcare schedule at your convenience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <ShieldCheckIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Your personal information is protected with enterprise-grade security. HIPAA compliant platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {['Create Account', 'Choose Time Slot', 'Get Confirmation'].map((step, idx) => (
              <div className="text-center" key={step}>
                <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold ${
                  idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-green-600' : 'bg-purple-600'
                } text-white`}>
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">
                  {idx === 0
                    ? 'Sign up with your basic information to get started'
                    : idx === 1
                    ? 'Select from available appointment times that work for you'
                    : 'Receive instant confirmation and manage your appointments'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of patients who trust MedBook for their healthcare scheduling</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
