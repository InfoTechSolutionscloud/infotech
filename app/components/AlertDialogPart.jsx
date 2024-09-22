//ShadCN Alert Dialog:
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertDialogPart = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-gray-800 p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-800 disabled:cursor-not-allowed">
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            By Clicking okay you will be logged out of your team dashboard of
            infotech solutions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/team/login";
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogPart;