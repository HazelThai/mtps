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
  Radio,
  RadioGroup,
  Paper,
  Typography,
  IconButton,
  FormLabel,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Delete, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface ActivityFormProps {
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

// Helper function to create default options
const createDefaultOptions = () => [
  { id: uuidv4(), text: "", label: "A" },
  { id: uuidv4(), text: "", label: "B" },
  { id: uuidv4(), text: "", label: "C" },
  { id: uuidv4(), text: "", label: "D" },
];

const TestForm = ({
  control,
  getValues,
  setValue,
  newTag,
  setNewTag,
  handleAddTag,
  pointsOptions,  
  categoryOptions,
  semesterOptions,
}: ActivityFormProps) => {
  const [testFormData, setTestFormData] = useState<AppTypes.TestV2>({
    id: "",
    title: "",
    description: "",
    dateStart: 0,
    dateEnd: 0,
    points: 0,
    status: "Public",
    location: "",
    tags: [],
    category: "Academic",
    semester: "",
    questions: [],
  });

  // Initialize with a default question
  useEffect(() => {
    const defaultOptions = createDefaultOptions();
    setTestFormData((prev) => ({
      ...prev,
      questions: [
        {
          id: uuidv4(),
          text: "",
          options: defaultOptions,
          correctOption: defaultOptions[0],
        },
      ],
    }));
  }, []);

  const handleDeleteQuestion = (questionId: string) => {
    setTestFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };
  const handleQuestionChange = (
    questionId: string,
    field: string,
    value: string
  ) => {
    setTestFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }));
  };
  const handleOptionChange = (
    questionId: string,
    optionId: string,
    value: string
  ) => {
    setTestFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text: value } : o
              ),
            }
          : q
      ),
    }));
  };
  const handleCorrectAnswerChange = (questionId: string, value: string) => {
    setTestFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctOption:
                q.options.find((o) => o.label === value) || q.options[0],
            }
          : q
      ),
    }));
  };
  const handleAddQuestion = () => {
    const questionId = uuidv4();
    // Create 4 default options (A, B, C, D)
    const defaultOptions = createDefaultOptions();

    setTestFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: questionId,
          text: "",
          options: defaultOptions,
          correctOption: defaultOptions[0], // Set option A as default correct answer
        },
      ],
    }));
  };
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
              <TextField
                {...field}
                label="Location"
                value={field.value || ""}
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
      <Grid2 size={12}>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Add at least 10 questions for your test
          </Typography>

          {testFormData.questions.map((question, index) => (
            <Paper key={question.id} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1">
                  Question {index + 1}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteQuestion(question.id)}
                  disabled={testFormData.questions.length === 1}
                >
                  <Delete />
                </IconButton>
              </Box>

              <TextField
                label="Question"
                fullWidth
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(question.id, "text", e.target.value)
                }
                margin="normal"
                required
              />

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Options
              </Typography>

              {question.options.map((option) => (
                <Box key={option.id} display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ minWidth: 20 }}>{option.label}.</Typography>
                  <TextField
                    fullWidth
                    placeholder={`Option ${option.label}`}
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(question.id, option.id, e.target.value)
                    }
                    size="small"
                    required
                  />
                </Box>
              ))}

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Correct Answer</FormLabel>
                <RadioGroup
                  row
                  value={question.correctOption.label}
                  onChange={(e) =>
                    handleCorrectAnswerChange(question.id, e.target.value)
                  }
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.label}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          ))}

          <Button
            variant="outlined"
            startIcon={<Plus />}
            onClick={handleAddQuestion}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Question
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default TestForm;
