Route::post('/session/start', [SessionController::class, 'start']);
Route::post('/session/end', [SessionController::class, 'end']);