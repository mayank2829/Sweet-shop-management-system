import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Candy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back! 🍬');
        navigate('/shop');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-candy flex items-center justify-center shadow-candy">
                <Candy className="w-7 h-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your Sweet Shop account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button
              type="submit"
              size="lg"
              variant="candy"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 text-sm text-center">
            <p className="text-muted-foreground">
              <strong>Demo:</strong> Use <span className="text-foreground">admin@sweetshop.com</span> for admin access
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 gradient-candy items-center justify-center p-8">
        <div className="max-w-lg text-center text-primary-foreground">
          <h2 className="text-4xl font-display font-bold mb-4">
            Sweeten Your Day
          </h2>
          <p className="text-primary-foreground/80">
            Access your account to explore our delicious collection of handcrafted sweets 
            and enjoy exclusive member benefits.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-primary-foreground/20 rounded-2xl p-6 backdrop-blur">
              <span className="text-3xl">🍫</span>
              <p className="mt-2 font-medium">Premium Chocolates</p>
            </div>
            <div className="bg-primary-foreground/20 rounded-2xl p-6 backdrop-blur">
              <span className="text-3xl">🎂</span>
              <p className="mt-2 font-medium">Fresh Cakes</p>
            </div>
            <div className="bg-primary-foreground/20 rounded-2xl p-6 backdrop-blur">
              <span className="text-3xl">🍪</span>
              <p className="mt-2 font-medium">Artisan Cookies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
