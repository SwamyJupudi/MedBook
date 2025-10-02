import { useState } from 'react';
import { Dialog, DialogContent } from '../components/Dialog';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Card } from '../components/Card';

const AuthModal = ({ isOpen, onClose, mode = "login", onAuth }) => {
  const [activeTab, setActiveTab] = useState(mode);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in as ${formData.username}`);
    // Your login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Registering user: ${formData.username}`);
    // Your register logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen p-0 border-none bg-transparent shadow-none flex items-center justify-center">
        <Card className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Welcome to MedBook</h2>
          </div>

          <Tabs defaultValue={mode} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" activeTab={activeTab} setActiveTab={setActiveTab}>
                Login
              </TabsTrigger>
              <TabsTrigger value="register" activeTab={activeTab} setActiveTab={setActiveTab}>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" activeTab={activeTab}>
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>

            <TabsContent value="register" activeTab={activeTab}>
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
