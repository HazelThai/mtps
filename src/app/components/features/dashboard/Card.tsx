import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  value?: number;
  subTitle?: string;
  typeChild?: "card" | "list";
  children?: {
    titleChild?: string;
    subTitleChild?: string;
    status?: "public" | "private";
    number_student_joined?: number;
    point?: number;
  }[];
}
export default function CardComponent(props: CardProps) {
  const { title, icon, value, subTitle, typeChild, children } = props;
  const cardHeaderStyle = !children
    ? {
        "& .MuiCardHeader-content": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }
    : {};
  return (
    <Card sx={{ borderRadius: 2, p: 2 }}>
      <CardHeader
        title={title}
        subheader={children ? subTitle : icon}
        sx={{ ...cardHeaderStyle }}
      />
      {children ? (
        children.map((c, index) => (
          <Box sx={{ p: 2 }} key={index}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                border: "1px solid black",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Box>
                {typeChild === "list" ? (
                  <div className="flex items-center gap-2">
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {c.titleChild?.charAt(0)}
                    </Avatar>
                    <div>
                      <p className="text-2xl font-bold">{c.titleChild}</p>
                      <p className="text-sm text-muted-foreground">
                        {c.subTitleChild}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold">{c.titleChild}</p>
                    <p className="text-sm text-muted-foreground">
                      {c.subTitleChild}
                    </p>
                  </div>
                )}
              </Box>
              {typeChild === "card" ? (
                <Box className="flex items-center gap-2">
                  <Chip label={c.status} />
                  <Chip label={c.number_student_joined} />
                </Box>
              ) : (
                <Chip label={c.point} />
              )}
            </CardContent>
          </Box>
        ))
      ) : (
        <CardContent>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      )}
    </Card>
  );
}
