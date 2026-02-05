namespace App\Http\Controllers;
use App\Models\WatchSession;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SessionController extends Controller
{
    public function start(Request $request)
    {
        $session = WatchSession::create([
            'user_name'  => $request->user_name,
            'video_name' => $request->video_name,
            'start_time' => Carbon::now(),
        ]);

        return response()->json([
            'session_id' => $session->id
        ]);
    }

    public function end(Request $request)
    {
        $session = WatchSession::findOrFail($request->session_id);

        $session->end_time = Carbon::now();
        $session->duration_seconds = $session->start_time->diffInSeconds($session->end_time);
        $session->save();

        return response()->json([
            'duration_seconds' => $session->duration_seconds
        ]);
    }
}