import { useQuery } from "react-query"
import { useAppSelector } from "utils/hooks"
import { getAllTournaments } from "utils/axios"
import {
  Alert,
  Container,
  Grid,
  Group,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core"
import TournamentCard from "../../ui/tournament/TournamentCard.ui"

const TournamentPage = () => {
  const { data, error } = useQuery("getTournaments", getAllTournaments)
  // const tournament = useAppSelector((s) => s.tournament)
  return (
    <Container size="xl">
      <Stack>
        <Title order={3}>Select Tournament</Title>
        <Group>
          {!data ? (
            error ? (
              <Alert>{JSON.stringify(error)}</Alert>
            ) : (
              <Grid>
                {Array(3)
                  .fill("1")
                  .map((_, i) => (
                    <Grid.Col xs={6} md={4} xl={3}>
                      <Skeleton>
                        <TournamentCard
                          key={i}
                          id=""
                          logo=""
                          name="Test Tournament Name"
                          org=""
                          path=""
                        />
                      </Skeleton>
                    </Grid.Col>
                  ))}
              </Grid>
            )
          ) : (
            <Grid>
              {data.map((tour) => (
                <Grid.Col xs={6} md={4} xl={3}>
                  <TournamentCard {...tour} key={tour.id} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Group>
      </Stack>
    </Container>
  )
}

export default TournamentPage