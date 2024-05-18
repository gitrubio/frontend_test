import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import useAuth from '@/hooks/useAuth';

export function LoginForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const {login,register,loading} = useAuth()
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      name: (val) => (val.trim().length > 4 ? null : 'Name is too short'),
      email: (val) => ( type === 'login' ? null : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)  ? null : 'Invalid email') ),
      password: (val) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val) ? null : 'Password must have at least 8 characters and contain at least one number and one letter and one uppercase letter'),
    },
  });
  const submit = () => { 
    if (type === 'login') {
      login(form.values)
    } else {
      register(form.values)
    }
  }
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500} style={{textAlign: 'center'}}>
        Welcome to <strong style={{ color: '#E12242'}}>HACID</strong>
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          
            <TextInput
              required
              label="user"
              placeholder="Your username"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name && 'user is too short'}
              radius="md"
            />
          

    {type === 'register' && (  
         <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />)}

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              color='red'
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor  component="button" type="button"  c='gray' onClick={() => toggle()} size="xs" underline="always">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" color={'#E12242'} disabled={loading} >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}