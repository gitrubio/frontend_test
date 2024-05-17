
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { AppShell } from '@mantine/core'

export default function Dashboard() {
  return (
    <AppShell>
        <AppShell.Header maw={'100%'}>
            <Header />
        </AppShell.Header>
        <AppShell.Main>

        </AppShell.Main>

        <AppShell.Footer>
            <Footer/>
        </AppShell.Footer>
    </AppShell>
  )
}
