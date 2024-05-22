<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request
    ) {
        $data = Transaction::orderBy('created_at', 'desc');

        if ($request->q) {
            $data = $data->where('code', 'like', '%' . $request->q . '%');
        }

        $data = $data->paginate($request->get('per_page', 10));

        return Inertia::render('Admin/Transaction/Index', compact('data'));
    }

    public function confirm(
        string $id
    ) {

        $transaction = Transaction::find($id);
        $transaction->update([
            'status' => 'CONFIRMED'
        ]);

        $transaction->items->each(function ($item) {
            Product::find($item->product_id)->update([
                'stock' => $item->product->stock - $item->quantity,
                'sold' => $item->product->sold + $item->quantity
            ]);
        });

        return redirect()->route('admin.transactions.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Transaction::with('user', 'items.product')->find($id);
        return Inertia::render('Admin/Transaction/Show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Transaction::find($id)->delete();
        return redirect()->route('admin.transactions.index');
    }
}
