import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Candy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const success = await register(email, password, name);
      if (success) {
        toast.success('Welcome to Sweet Shop! 🎉');
        navigate('/shop');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 gradient-candy items-center justify-center p-8">
        <div className="max-w-lg text-center text-primary-foreground">
          <h2 className="text-4xl font-display font-bold mb-4">
            Join Our Sweet Family
          </h2>
          <p className="text-primary-foreground/80">
            Create an account to unlock exclusive member benefits, 
            special discounts, and be the first to know about new treats.
          </p>
          <div className="mt-12">
            <div className="bg-primary-foreground/20 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-xl font-semibold mb-4">Member Benefits</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/30 flex items-center justify-center text-sm">✓</span>
                  10% off your first order
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/30 flex items-center justify-center text-sm">✓</span>
                  Early access to new products
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/30 flex items-center justify-center text-sm">✓</span>
                  Birthday surprise treats
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/30 flex items-center justify-center text-sm">✓</span>
                  Exclusive member-only sales
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-candy flex items-center justify-center shadow-candy">
                <Candy className="w-7 h-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Join the Sweet Shop family today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-12 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 pr-12 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-12 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="candy"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
