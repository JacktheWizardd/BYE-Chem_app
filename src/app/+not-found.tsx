import { Back, Button, Plain, Screen, Title } from '@/components/ui';

export default function NotFound() {
  return (
    <Screen>
      <Back href="/" label="Chemistry" />
      <Title>Not here</Title>
      <Plain>This page doesn’t exist, or hasn’t been written yet.</Plain>
      <Button label="Go to the chapters" href="/" />
    </Screen>
  );
}
