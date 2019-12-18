import * as React from "react";
import { Pane, Text, Heading, Card, Image, Avatar } from "evergreen-ui";
import { useParams, Link } from "react-router-dom";

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
  avatar: string | null;
  metadata: {
    team_name?: string;
  };
}

const Teams: ITeam[] = [
  {
    user_id: "456030655042547712",
    metadata: {
      team_name: "Didn't throw a tantrum"
    },
    league_id: "469392385332211712",
    display_name: "Syracuse",
    avatar: "fa7c4aca5cc98069d81010b5b129dd73"
  },
  {
    user_id: "465787337511530496",
    metadata: {
      team_name: "Dolphins Tanking For Tua"
    },
    league_id: "469392385332211712",
    display_name: "AyoItsFiggy",
    avatar: "1498a9de9d12c2cd0d75aa6a90e73b8a"
  },
  {
    user_id: "466383283677032448",
    metadata: {},
    league_id: "469392385332211712",
    display_name: "Figx3",
    avatar: "927a93ae447712c1ce7b9f8c2714ce96"
  },
  {
    user_id: "469400438920179712",
    metadata: {},
    league_id: "469392385332211712",
    display_name: "DirtyGirth",
    avatar: "d5c913eec821ea0b402ecd856b2d313d"
  },
  {
    user_id: "469959355341467648",
    metadata: {
      team_name: "Pop, Lockett, & Drop It"
    },
    league_id: "469392385332211712",
    display_name: "Scy",
    avatar: "06373b9c4d2bd34037b2706546f99c1d"
  },
  {
    user_id: "470018338567745536",
    metadata: {
      team_name: "Cooper Kupped my ballz"
    },
    league_id: "469392385332211712",
    display_name: "umiFF",
    avatar: "6c237ed2495732e0d201c88f77125322"
  },
  {
    user_id: "470025645879980032",
    metadata: {
      team_name: "Team no Touchdowns"
    },
    league_id: "469392385332211712",
    display_name: "F3ELtheBERN",
    avatar: null
  },
  {
    user_id: "470253882040119296",
    metadata: {},
    league_id: "469392385332211712",
    display_name: "Mayfieldmvp",
    avatar: "0386d3a727fa280267a0c477696b9f29"
  },
  {
    user_id: "470461626873540608",
    metadata: {
      team_name: "Sf4Lyfe"
    },
    league_id: "469392385332211712",
    display_name: "Vegeta636",
    avatar: null
  },
  {
    user_id: "470725484271890432",
    metadata: {
      team_name: "Poo Poo Boys"
    },
    league_id: "469392385332211712",
    display_name: "Jargba",
    avatar: "f6a87ce6a6ee227f8846715681343ecf"
  }
];

const TeamImage = (props: { imageUrl: string | null; teamName: string }) => {
  return props.imageUrl ? (
    <Image
      height={30}
      width={30}
      marginRight={16}
      borderRadius="50%"
      backgroundSize="contain"
      src={`https://sleepercdn.com/avatars/thumbs/${props.imageUrl}`}
    />
  ) : (
    <Avatar
      isSolid
      marginRight={16}
      name={props.teamName}
      color="purple"
      size={30}
    />
  );
};

export const LeagueView = () => {
  const { leagueId } = useParams();
  const [teams, setTeamsData] = React.useState<ITeam[]>(Teams);

  // React.useEffect(() => {
  //   const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => setTeamsData(data));
  // }, [leagueId]);

  // TODO fix how this renders
  return (
    <Pane
      marginTop={30}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      flexWrap="wrap"
    >
      {teams.map(team => {
        return (
          <Link
            key={team.user_id}
            to={`/${leagueId}/${team.user_id}`}
            style={{ textDecoration: "unset" }}
          >
            <Card
              display="flex"
              justifyContent="start"
              alignItems="center"
              flexDirection="row"
              padding={8}
              margin={8}
              background="tint2"
              borderRadius={5}
              border
              elevation={1}
              width={200}
              minHeight={80}
            >
              <TeamImage teamName={team.display_name} imageUrl={team.avatar} />
              <Pane>
                <Heading>{team.display_name}</Heading>
                <Text size={300}>{team.metadata.team_name}</Text>
              </Pane>
            </Card>
          </Link>
        );
      })}
    </Pane>
  );
};
