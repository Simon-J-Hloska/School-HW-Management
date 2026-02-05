class WatchSession extends Model
{
    protected $fillable = [
        'user_name',
        'video_name',
        'start_time',
        'end_time',
        'duration_seconds'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function start(Request $request)
    public function end(Request $request)
    
}