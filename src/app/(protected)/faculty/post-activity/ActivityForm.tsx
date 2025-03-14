import { AppTypes } from "@/types";
import {
  TextField,
  Grid2,
  FormControl,
  Autocomplete,
  Switch,
  FormControlLabel,
  FormHelperText,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface PostFormProps {
  control: Control<AppTypes.PostV2>;
  getValues: UseFormGetValues<AppTypes.PostV2>;
  setValue: UseFormSetValue<AppTypes.PostV2>;
  newTag: string;
  setNewTag: (value: string) => void;
  handleAddTag: () => void;
  pointsOptions: { label: string; value: number }[];
  categoryOptions: { label: string; value: string }[];
  semesterOptions: { label: string; value: string }[];
}

const ActivityForm = ({
  control,
  getValues,
  setValue,
  newTag,
  setNewTag,
  handleAddTag,
  pointsOptions,
  categoryOptions,
  semesterOptions,
}: PostFormProps) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="image"
            render={({ field }) => <TextField {...field} label="Image" />}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="title"
            render={({ field }) => <TextField {...field} label="Title" />}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField {...field} label="Description" multiline rows={4} />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControl fullWidth>
          <Controller
            control={control}
            name="dateStart"
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Date Start"
                value={field.value ? dayjs(field.value) : null}
                onChange={(value) => field.onChange(value?.unix())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControl fullWidth>
          <Controller
            control={control}
            name="dateEnd"
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Date End"
                value={field.value ? dayjs(field.value) : null}
                onChange={(value) => field.onChange(value?.unix())}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControl fullWidth>
          <Controller
            control={control}
            name="points"
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={
                  field.value
                    ? pointsOptions.find(
                        (option) => option.value === field.value
                      )
                    : null
                }
                options={pointsOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Points" />
                )}
                onChange={(_, value) => field.onChange(value?.value)}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Switch
                  checked={field.value === "Public"}
                  onChange={(_, checked) =>
                    field.onChange(checked ? "Public" : "Private")
                  }
                />
              )}
            />
          }
          label="Public"
        />
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <TextField {...field} label="Location" value="Online" disabled />
            )}
          />
          <FormHelperText>
            This is a post test, so the location is online.
          </FormHelperText>
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControl fullWidth>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={categoryOptions.find(
                  (option) => option.value === field.value || null
                )}
                options={categoryOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FormControl fullWidth>
          <Controller
            control={control}
            name="semester"
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={semesterOptions.find(
                  (option) => option.value === field.value
                )}
                options={semesterOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Semester" />
                )}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={12}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <TextField
                  {...field}
                  label="Tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  onClick={handleAddTag}
                  variant="contained"
                  sx={{ bgcolor: "black", color: "white" }}
                >
                  Add
                </Button>
              </Box>
            )}
          />
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 3 }}>
            {getValues("tags").map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color={
                  "primary"
                }
                onDelete={() => {
                  setValue(
                    "tags",
                    getValues("tags").filter((t) => t !== tag)
                  );
                }}
              />
            ))}
          </Box>
        </FormControl>
      </Grid2>
    </Grid2>
  );
};

export default ActivityForm;
