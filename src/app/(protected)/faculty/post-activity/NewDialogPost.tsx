import { AppTypes } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomTabs from "@/app/components/@shared/tabs/Tab";
import dayjs from "dayjs";
import ActivityForm from "./ActivityForm";
import TestForm from "./TestForm";

type Options = {
  onOk?: (data: AppTypes.Post) => Promise<boolean>;
  onCancel: () => void;
  initialData?: AppTypes.Post;
  initialTab?: string;
};
const FormData: AppTypes.Post = {
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
  image: "",
  testId: "",
  questions: [],
  faculty: "",
};
interface Tabs {
  label: string;
  value: string;
}
interface SemesterOption {
  label: string;
  value: string;
  yearStart: number;
  yearEnd: number;
}

const tabs: Tabs[] = [
  {
    label: "Test",
    value: "test",
  },
  {
    label: "Activity",
    value: "activity",
  },
];
const schema = yup.object().shape({
  id: yup.string().required("ID is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().optional(),
  dateStart: yup.number().required("Date start is required"),
  dateEnd: yup.number().required("Date end is required"),
  points: yup.number().required("Points is required"),
  status: yup.string().required("Status is required"),
  location: yup.string().required("Location is required"),
  tags: yup.array().of(yup.string()),
  category: yup.string().required("Category is required"),
  semester: yup.string().required("Semester is required"),
  students_joined: yup.array().of(yup.string()),
  total_students: yup.number(),
});
const NewDialogPost = forwardRef((_, ref) => {
  const [options, setOptions] = useState<Options & { open: boolean }>();
  const [tab, setTab] = useState<Tabs>(tabs[0]);
  const [newTag, setNewTag] = useState("");

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<AppTypes.Post>({
      defaultValues: options?.initialData || FormData,
      // resolver: yupResolver(schema),
      mode: "onChange",
    });

  // Update form when initialData changes
  useEffect(() => {
    if (options?.initialData) {
      reset(options.initialData);
    }
  }, [options?.initialData, reset]);

  // Set initial tab if provided
  useEffect(() => {
    if (options?.initialTab) {
      const initialTabObj =
        tabs.find((t) => t.value === options.initialTab) || tabs[0];
      setTab(initialTabObj);
    }
  }, [options?.initialTab]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(tabs.find((tab) => tab.value === newValue) || tabs[0]);
  };
  const handleOk = async (data: AppTypes.Post) => {
    try {
      setOptions({
        open: false,
        onCancel: options?.onCancel || (() => {}),
      });
    } catch (err: any) {
      toast.error("message" in err ? err.message : "Something went wrong!");
    }
  };

  const handleCancel = () => {
    options?.onCancel?.();
    setOptions({
      open: false,
      onCancel: options?.onCancel || (() => {}),
    });
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        show: (options: Options) => {
          setOptions({
            ...options,
            open: true,
          });

          // If initialTab is provided, set it
          if (options.initialTab) {
            const initialTabObj =
              tabs.find((t) => t.value === options.initialTab) || tabs[0];
            setTab(initialTabObj);
          }
        },
        hide: () => {
          setOptions({
            open: false,
            onCancel: options?.onCancel || (() => {}),
          });
        },
      };
    },
    []
  );

  const pointsOptions = [
    {
      label: "3",
      value: 3,
    },
    {
      label: "5",
      value: 5,
    },
    {
      label: "10",
      value: 10,
    },
    {
      label: "15",
      value: 15,
    },
    {
      label: "20",
      value: 20,
    },
  ];
  const categoryOptions = [
    {
      label: "Academic",
      value: "Academic",
    },
    {
      label: "Volunteer",
      value: "Volunteer",
    },
    {
      label: "Mental Physical",
      value: "Mental Physical",
    },
    {
      label: "All",
      value: "All",
    },
  ];
  const generateSemesterOptions = (): SemesterOption[] => {
    const currentYear = new Date().getFullYear();
    const options: SemesterOption[] = [];

    // Generate for 4 years (current year and 3 previous years)
    for (let yearOffset = 0; yearOffset < 4; yearOffset++) {
      const yearStart = currentYear - yearOffset;
      const yearEnd = yearStart + 1;

      options.push({
        label: `Semester 1 (${yearStart}-${yearEnd})`,
        value: `sem1-${yearStart}-${yearEnd}`,
        yearStart,
        yearEnd,
      });

      options.push({
        label: `Semester Summer (${yearStart}-${yearEnd})`,
        value: `semSummer-${yearStart}-${yearEnd}`,
        yearStart,
        yearEnd,
      });

      options.push({
        label: `Semester 2 (${yearStart}-${yearEnd})`,
        value: `sem2-${yearStart}-${yearEnd}`,
        yearStart,
        yearEnd,
      });
    }

    return options;
  };
  const handleAddTag = () => {
    if (newTag && !getValues("tags").includes(newTag)) {
      setValue("tags", [...getValues("tags"), newTag]);
      setNewTag("");
    }
  };
  const semesterOptions = generateSemesterOptions();
  return (
    <Dialog
      open={options?.open || false}
      maxWidth="md"
      fullWidth
      onClose={handleCancel}
      disableEscapeKeyDown={false}
    >
      <form noValidate autoComplete="off">
        <DialogTitle>
          {options?.initialData
            ? "Edit Post / Activity"
            : "New Post / Activity"}
        </DialogTitle>
        <CustomTabs
          value={tab.value}
          onChange={handleChangeTab}
          tabs={tabs.map((tab) => tab.label)}
          boxSx={{
            bgcolor: "unset",
          }}
          tabsSx={{
            color: "black",
            "&.Mui-selected": {
              color: "white",
              bgcolor: "black",
              borderRadius: 2,
            },
          }}
        />
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {tab.value === "test" && (
              <TestForm
                control={control}
                getValues={getValues}
                setValue={setValue}
                newTag={newTag}
                setNewTag={setNewTag}
                handleAddTag={handleAddTag}
                pointsOptions={pointsOptions}
                categoryOptions={categoryOptions}
                semesterOptions={semesterOptions}
              />
            )}
            {tab.value === "activity" && (
              <ActivityForm
                control={control}
                getValues={getValues}
                setValue={setValue}
                newTag={newTag}
                setNewTag={setNewTag}
                handleAddTag={handleAddTag}
                pointsOptions={pointsOptions}
                categoryOptions={categoryOptions}
                semesterOptions={semesterOptions}
              />
            )}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", gap: 2, pt: "1.25rem !important" }}
        >
          <Button onClick={handleCancel} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handleOk)}
            variant="contained"
            color="success"
          >
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
export type NewDialogPostRef = {
  show: (options: Options) => void;
  hide: () => void;
};
export const useNewDialogPost = () => {
  const ref = useRef<NewDialogPostRef>();
  const renderDialog = () => <NewDialogPost ref={ref} />;
  const showDialog = (options: Options) => {
    ref.current?.show(options);
  };
  const hideDialog = () => {
    ref.current?.hide();
  };
  return { renderDialog, showDialog, hideDialog };
};
export default NewDialogPost;
